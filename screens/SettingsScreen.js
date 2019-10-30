import React from 'react';
import { connect } from 'react-redux'
import { SectionList, Image, StyleSheet, Text, View, ProgressBarAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { REFRESH_AUTH, FORCE_LOGIN, UPDATE_OFFLINE_SWITCH } from '../js/actionTypes';
import env from 'react-native-config'

const ListHeader = (props) => {
  if ((props.currentUser && props.currentUser.decoded) || props.isOffline) {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <AppIconPreview />
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {props.currentUser.decoded.aud}
          </Text>

          <Text style={styles.slugText} numberOfLines={1}>
            {props.currentUser.decoded.idir_userid}
          </Text>

          <Text style={styles.descriptionText}>
            {props.currentUser.decoded.iss}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <AppIconPreview />
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            You are currently offline.
          </Text>
        </View>
      </View>
    );
  }
};

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = props => {
  return (
    <View style={styles.sectionContentContainer}>
      {props.children}
    </View>
  );
};

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl =
      'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return (
    <Image
      source={require("../assets/images/bcgov-header-vert-SM.png")}
      style={{ width: 64, height: 64 }}
      resizeMode="cover"
    />
  );
};

const Color = ({ value }) => {
  if (!value) {
    return <View />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <View style={styles.colorTextContainer}>
          <Text style={styles.sectionContentText}>
            {value}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  footer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  colorTextContainer: {
    flex: 1,
  },
  refreshbutton: {
    marginBottom: 10
  },
  forcebutton: {
    marginBottom: 10
  },
  onlinebutton: {
    marginHorizontal: 20
  }
});

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Settings'
    }
  };

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };
  _renderItem = ({ item }) => {
    if (item.type === 'color') {
      return (
        <SectionContent>
          {item.value && <Color value={item.value} />}
        </SectionContent>
      );
    } else {
      return (
        <SectionContent>
          <Text style={styles.sectionContentText}>
            {item.value}
          </Text>
        </SectionContent>
      );
    }
  };

  refresh() {
    this.props.dispatch({ type: REFRESH_AUTH, refresh: true });
  }

  forceReAuth() {
    this.props.dispatch({ type: FORCE_LOGIN, forceLogin: true });
  }

  render() {
    const sections = [];
    if (this.props.authState && this.props.currentUser && this.props.currentUser.decoded) {
      sections.push({ data: [{ value: "Yes" }], title: 'loggedIn' });
      sections.push({ data: [{ value: this.props.currentUser.decoded.preferred_username }], title: 'Username' });

      let roles = "";
      this.props.currentUser.decoded.realm_access.roles.map(item => {
        roles += item + " | ";
      });

      sections.push({ data: [{ value: roles }], title: 'Scopes' });

      sections.push({ data: [{ value: this.props.currentUser.expires_in }], title: 'Token Expiry' });
      sections.push({ data: [{ value: env.IS_PRODUCTION }], title: 'Is Production' });
    }
    if ((this.props.currentUser && this.props.currentUser.decoded) || this.props.isOffline) {
      return (
        <View style={styles.container}>
          <SectionList
            style={styles.container}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={ListHeader(this.props)}
            sections={sections}
          />
          <View style={styles.footer}>
            <Button
              style={styles.refreshbutton}
              title="Refresh Token"
              accessibilityLabel="This button refreshes your credentials"
              onPress={async () => this.refresh()}
            />
            <Button
              style={styles.forcebutton}
              title="Force Re-Authentication"
              buttonStyle={{
                backgroundColor: 'red'
              }}
              accessibilityLabel="This button refreshes your credentials"
              onPress={async () => this.forceReAuth()}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SectionList
            style={styles.container}
            ListHeaderComponent={ListHeader(this.props)}
            sections={sections}
          />
          <View style={styles.footer}>
            <Button
              style={styles.forcebutton}
              title="Go online"
              accessibilityLabel="This button refreshes your credentials"
              onPress={async () => this.forceReAuth()}
            />
          </View>
        </View>
      )
    }
  }
}
const mapStateToProps = storeState => {
  return {
    currentUser: storeState.auth.currentUser,
    authState: storeState.auth.authState,
    projects: storeState.models.projects
  };
};

export default connect(mapStateToProps)(SettingsScreen);