import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

export default function NewConversation({navigation}: {navigation: any}) {
  const inputProps = {enterKeyHint: 'search'};
  const {t, i18n} = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.interlocutorContainer}>
          <View style={styles.messageItemContainer}>
            <View style={styles.messageImage}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1679309252532-de2d31754e56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                }}
                resizeMode="cover"
                style={styles.messageImageCover}
              />
            </View>

            <View style={styles.messageTextContainer}>
              <Text style={styles.interlocutor}>Alphone Kona</Text>
              <Text style={styles.messageText}>Teacher / Bamboo</Text>
            </View>
          </View>
        </View>

        <View style={styles.conversationContainer}>
          <ScrollView style={{flex: 1, paddingTop: 15}}>
            <View style={styles.conversationListContainer}>
              <View style={styles.messageReceiverContainer}>
                <View style={styles.receiverTextContainer}>
                  <View style={styles.receiverText}>
                    <Text style={styles.receiverTextColor}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the. and
                      typesetting industry. Lorem Ipsum has been the.
                    </Text>
                  </View>
                  <View style={styles.timeTextReceiver}>
                    <Text style={styles.timeTextSendFont}>13:50</Text>
                  </View>
                </View>

                <View style={styles.receiverImageContainer}>
                  <View style={styles.senderImage}>
                    <Image
                      source={{
                        uri: 'https://plus.unsplash.com/premium_photo-1682096992977-650be957f857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                      }}
                      resizeMode="cover"
                      style={styles.senderImageCover}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.textareaContainer}>
          <View style={styles.textareaFieldContainer}>
            <View style={styles.fileUploadContanier}>
              <MaterialIcons
                name="attach-file"
                size={28}
                color={COLORS.grayLight}
              />
            </View>

            <View style={styles.textareaField}>
              <TextInput
                multiline
                style={styles.inputModal}
                placeholder={t('conversationMessage.description')}
                onChangeText={() => {}}
              />
            </View>

            <View style={styles.sendButtonContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                <MaterialCommunityIcons
                  name="send"
                  size={28}
                  color={COLORS.primary}
                  disabled
                />
              </TouchableOpacity>
            </View>
          </View>
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
  interlocutorContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  messageItemContainer: {
    flexDirection: 'row',
    marginBottom: 23,
    //backgroundColor: 'red',
  },
  messageImage: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: 1,
  },
  messageImageCover: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayVeryLight,
  },
  messageTextContainer: {
    flex: 3,
    paddingLeft: 10,
    //backgroundColor:'green'
  },
  interlocutor: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.gray,
    paddingTop: 7,
    paddingBottom: 5,
    //backgroundColor:'yellow'
  },
  messageText: {
    flex: 2,
    letterSpacing: 1,
  },
  conversationContainer: {
    flex: 5,
    borderTopColor: COLORS.grayExtraLight,
    borderTopWidth: 1,
    paddingBottom: 100,
    //backgroundColor: 'red'
  },
  conversationListContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  textareaContainer: {
    width: '100%',
    height: 70,
    marginBottom: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    //backgroundColor: COLORS.secondary,
  },
  textareaFieldContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grayExtraLight,
    borderWidth: 1,
  },
  fileUploadContanier: {
    flex: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.grayVeryLight,
    //backgroundColor:'red',
  },
  textareaField: {
    flex: 7,
    height: 55,
    justifyContent: 'center',
    paddingLeft: 10,
    //backgroundColor:'green',
  },
  sendButtonContainer: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    //backgroundColor:'yellow',
  },
  inputModal: {
    borderWidth: 1,
    borderColor: COLORS.white,
    color: COLORS.gray,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    zIndex: 0,
  },
  messageSenderContainer: {
    flexDirection: 'row',
    minHeight: 80,
    marginBottom: 20,
    //backgroundColor:'red',
  },
  senderImageContainer: {
    flex: 1,
    //backgroundColor: 'green'
  },
  senderImage: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: 1,
  },
  senderImageCover: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayVeryLight,
  },
  senderTextContainer: {
    flex: 5,
    marginTop: 10,
    //backgroundColor: 'yellow',
  },
  senderText: {
    flex: 3,
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    backgroundColor: COLORS.secondaryLight,
  },
  senderTextColor: {
    color: COLORS.black,
    letterSpacing: 1,
  },
  timeTextSend: {
    flex: 1,
    marginTop: 4,
    paddingRight: 4,
    alignItems: 'flex-end',
    //backgroundColor:'green',
  },
  timeTextSendFont: {
    fontSize: 13,
  },

  messageReceiverContainer: {
    flexDirection: 'row',
    minHeight: 80,
    marginBottom: 20,
  },
  receiverImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  receiverImage: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: 1,
  },
  receiverImageCover: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayVeryLight,
  },
  receiverTextContainer: {
    flex: 5,
    marginTop: 10,
  },
  receiverText: {
    flex: 3,
    padding: 10,
    borderRadius: 8,
    borderTopRightRadius: 0,
    backgroundColor: COLORS.primaryDark,
  },
  receiverTextColor: {
    color: COLORS.white,
    letterSpacing: 1,
  },
  timeTextReceiver: {
    flex: 1,
    marginTop: 4,
    paddingLeft: 4,
    alignItems: 'flex-start',
  },
  timeTextReceiverFont: {
    fontSize: 13,
  },

  messageAnotherContainer: {
    flexDirection: 'row',
    minHeight: 80,
    marginBottom: 20,
    //backgroundColor:'red',
  },
  anotherImageContainer: {
    flex: 1,
    //backgroundColor: 'green'
  },
  anotherImage: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: 1,
  },
  anotherImageCover: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayVeryLight,
  },
  anotherTextContainer: {
    flex: 5,
    marginTop: 10,
    //backgroundColor: 'yellow',
  },
  anotherText: {
    flex: 3,
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    backgroundColor: COLORS.secondary,
  },
  anotherTextColor: {
    color: COLORS.white,
    letterSpacing: 1,
  },
  timeTextAnother: {
    flex: 1,
    marginTop: 4,
    paddingRight: 4,
    alignItems: 'flex-end',
    //backgroundColor:'green',
  },
  timeTextAnotherFont: {
    fontSize: 13,
  },
});
