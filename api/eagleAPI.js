import { API_ADMIN, DATE_FULL_MONTH_DAY_YEAR, staticProjects } from '../js/constants'
import { PATH_PROJECT } from '../js/paths'

import env from 'react-native-config'

import * as Action from '../js/actionTypes'

import store from '../js/store'
import { formatDateTime, sortableDateTime } from '../utils/date'

export function parseProjects(tr) {
  if (tr.timestamp) {
    const storeState = store.getState()
    const projects = storeState.lookups.projects.find((fd) => { return fd.id === tr.id })

    tr.key = tr.id + '+' + tr.timestamp
    tr.displayDate = formatDateTime(tr.timestamp, DATE_FULL_MONTH_DAY_YEAR)
    tr.sortDate = sortableDateTime(tr.timestamp)
    tr.pName = projects ? projects.name : ''
  }

  return tr
}

export async function getProjects() {
  console.log('Getting projects')
  console.log(API_ADMIN, `/${PATH_PROJECT}?fields=name`)
  let response = null
  try {
    response = await fetch(
      `${env.API_HOST}/api/search?dataset=Project&pageSize=1000`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const responseJson = await response.json()
    // console.log('json:', responseJson)
    if (responseJson.length > 0) {
      const projects = responseJson[0].searchResults.map(project => { return parseProjects(project) })
      // console.log("theprojects:", projects);
      store.dispatch({ type: Action.UPDATE_PROJECTS, projects: projects })
    }
  } catch (error) {
    console.log('ERROR:', error)
    // Use static list instead.
    const projects = staticProjects[0].searchResults.map(project => { return parseProjects(project) })
    // console.log("theprojects:", projects);
    store.dispatch({ type: Action.UPDATE_PROJECTS, projects: projects })
  }
}

export async function uploadInspection(currentUser, inspection) {
  return new Promise(async function(resolve, reject) {
    let response = null
    let data = null
    const inspectionObject = {
      inspectionId: inspection.inspectionId,
      project: inspection.project ? inspection.project._id : null,
      customProjectName: inspection.customProjectName,
      startDate: inspection.startDate,
      endDate: inspection.endDate,
      email: currentUser.decoded.email,
      case: inspection.case,
      label: inspection.label,
      name: inspection.name
    }
    try {
      data = JSON.stringify(inspectionObject)
      console.log('Posting Inspection:', data)
    } catch (e) {
      console.log('Error parsing:', e)
      resolve(null)
    }

    try {
      const curInsp = inspection
      response = await fetch(
        `${env.API_HOST}/api/inspection`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + currentUser.jwtToken
          },
          body: data
        }
      )
      // console.log('json:', response)
      const resObj = await response.json()
      if (response.status === 200) {
        // curInsp.status = 'Uploading';

        await uploadElements(currentUser, curInsp.project ? curInsp.project._id : null, resObj._id, inspection.elements)

        inspection.status = 'Submitted'
        console.log('Done submitting:', inspection)
        resolve(inspection)
      } else {
        console.log('error submitting:', response)
        // The caller will check null and throw up an alert
        resolve(null)
      }
    } catch (error) {
      console.log('Error:', error)
      // The caller will check null and throw up an alert
      resolve(null)
    }
  })
}

async function uploadElements(currentUser, projId, inspId, elements) {
  console.log('Uploading elements', elements)
  return await Promise.all(elements.map(async element => {
    // Upload each asset

    const elObj = await createElement(currentUser, projId, inspId, element)
    console.log('elObj:', elObj)

    // TODO: Deal with failures.
    return elObj
  }))
}

async function createElement(currentUser, projId, inspId, element) {
  const url = `${env.API_HOST}/api/inspection/${inspId}/element`

  const formData = new FormData()
  formData.append('elementId', element.elementId)
  formData.append('title', element.title)
  formData.append('requirement', element.requirement)
  formData.append('description', element.description)
  formData.append('timestamp', element.timestamp)
  formData.append('project', projId)

  console.log('Creating element:', element.elementId)

  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + currentUser.jwtToken
      },
      body: formData
    }
  )
  // console.log('json:', response);
  if (response.status !== 200) {
    console.log('Server error:', response.status)
    throw 'Response is null'
  }
  const resObj = await response.json()

  // iterate through the items if there are any
  return await Promise.all(element.items.map(async item => {
    const res = await uploadItem(currentUser, projId, resObj._id, inspId, item)

    if (res === null) {
      // Error
      console.log('error uploading item.')
      throw 'Response is null'
    } else {
      console.log('Res:', res)
      return res
    }
  }))
}

async function uploadItem(currentUser, projId, elementId, inspId, item) {
  const url = `${env.API_HOST}/api/inspection/${inspId}/${elementId}/item`

  const formData = new FormData()
  formData.append('project', projId)

  switch (item.type) {
  case 'voice':
  case 'video':
  case 'photo':
    {
      const filename = item.uri.substring(item.uri.lastIndexOf('/') + 1, item.uri.length)

      // Safety check
      // if (!RNFS.exists(item.uri)) {
      //   return ''; // return !null, but noop
      // }

      console.log('Filename:', filename)
      formData.append('upfile', { uri: item.uri, name: filename })
    }
    break
  }

  formData.append('itemId', item.itemId)
  formData.append('type', item.type)
  formData.append('geo', JSON.stringify(item.geo))
  formData.append('caption', item.caption)
  formData.append('timestamp', item.timestamp)

  console.log('uploadItem:', formData)

  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + currentUser.jwtToken
      },
      body: formData
    }
  )
  // console.log('json:', response);
  if (response.status === 200) {
    return item
  } else {
    throw 'Error in Response'
  }
}
