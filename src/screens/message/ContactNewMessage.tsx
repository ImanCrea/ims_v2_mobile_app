import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

export default function ContactNewMessage({navigation}: {navigation: any}) {
  const inputProps = {enterKeyHint: 'search'};
  const {t, i18n} = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchToolbar}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.input}
              placeholder={t('message.search')}
              {...inputProps}
            />
          </View>
        </View>

        <View style={styles.messageListContainer}>
          <ScrollView style={{paddingLeft: 15, paddingRight: 15}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate(ROUTES.MESSAGE_NEW_MESSAGE)}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1680012591395-f9ac10887f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Justine Koua</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.white,
  },
  searchToolbar: {
    flexDirection: 'row',
    //marginTop: 10,
    //backgroundColor:'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 6,
    flexDirection: 'row',
    padding: 6,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: COLORS.grayVeryLight,
    borderRadius: 6,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 3,
    fontSize: 16,
    borderRadius: 0,
    color: COLORS.gray,
    marginLeft: 4,
  },
  messageListContainer: {
    flex: 4,
    //padding: 15,
    paddingBottom: 15,
    paddingTop: 30,
  },
  messageItemContainer: {
    flexDirection: 'row',
    marginBottom: 23,
  },
  messageImage: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: 1,
    //backgroundColor: 'red',
  },
  messageImageCover: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayVeryLight,
    paddingRight: 10,
  },
  messageTextContainer: {
    flex: 1,
    paddingLeft: 10,
    //backgroundColor: 'red',
  },
  interlocutor: {
    //flex: 1,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.gray,
    paddingTop: 12,
  },
  messageText: {
    // flex: 3,
    // letterSpacing: 1,
  },
});
