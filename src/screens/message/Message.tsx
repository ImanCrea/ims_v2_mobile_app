import React from 'react';
import {Platform, Pressable} from 'react-native';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Message({ navigation }: { navigation: any }) {
  const inputProps = {enterKeyHint: 'search'};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchToolbar}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              {...inputProps}
            />
          </View>

          <View style={styles.editIconBox}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.editIcon}>
                <MaterialIcons name="edit" size={24} color={COLORS.gray} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.recentMessage}>
          <ScrollView horizontal={true}>
            <View style={styles.recentMessageContainer}>
              <View style={styles.recentMessageItemContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.MESSAGE_DETAILS)}>
                  <View style={styles.recentMessageItem}>
                    <View style={styles.recentMessageImage}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1663964619161-ab147c23c71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                        }}
                        resizeMode="cover"
                        style={styles.recentMessageImageCover}
                      />
                    </View>
                    <Text style={styles.recentMessagetitle}>Ange koffi</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.recentMessageContainer}>
              <View style={styles.recentMessageItemContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                  <View style={styles.recentMessageItem}>
                    <View style={styles.recentMessageImage}>
                      <Image
                        source={{
                          uri: 'https://plus.unsplash.com/premium_photo-1664884631934-ba8369b726f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                        }}
                        resizeMode="cover"
                        style={styles.recentMessageImageCover}
                      />
                    </View>
                    <Text style={styles.recentMessagetitle}>Diane kobenan</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.recentMessageContainer}>
              <View style={styles.recentMessageItemContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                  <View style={styles.recentMessageItem}>
                    <View style={styles.recentMessageImage}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1600714741644-7083deeeca4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjkwfHx1c2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
                        }}
                        resizeMode="cover"
                        style={styles.recentMessageImageCover}
                      />
                    </View>
                    <Text style={styles.recentMessagetitle}>Michelle Yaka</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.recentMessageContainer}>
              <View style={styles.recentMessageItemContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                  <View style={styles.recentMessageItem}>
                    <View style={styles.recentMessageImage}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1663964619161-ab147c23c71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                        }}
                        resizeMode="cover"
                        style={styles.recentMessageImageCover}
                      />
                    </View>
                    <Text style={styles.recentMessagetitle}>Jean Black</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.recentMessageContainer}>
              <View style={styles.recentMessageItemContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                  <View style={styles.recentMessageItem}>
                    <View style={styles.recentMessageImage}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1663964619161-ab147c23c71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                        }}
                        resizeMode="cover"
                        style={styles.recentMessageImageCover}
                      />
                    </View>
                    <Text style={styles.recentMessagetitle}>Ange Koffi</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View> */}

        <View style={styles.messageListContainer}>
          <ScrollView style={{paddingLeft:15, paddingRight: 15}}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.MESSAGE_DETAILS)}>
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
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy Lorem..
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTime}>10:30</Text>
                  <View style={styles.newMessageStatus} />
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
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy Lorem...
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTime}>07:30</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1586295416546-b84fa77499a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Marlene Kouame</Text>
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy..
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTime}>Hier</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1585930238664-01cc82685bbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Marlene Kouame</Text>
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy...
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTimeDay}>07/08/2023</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1669833530854-ea48d70e811b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Marlene Kouame</Text>
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy...
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTimeDay}>07/08/2023</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1682096992977-650be957f857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Marlene Kouame</Text>
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy Lorem Ipsum...
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTimeDay}>07/08/2023</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={styles.messageItemContainer}>
                <View style={styles.messageImage}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1663964619161-ab147c23c71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                    }}
                    resizeMode="cover"
                    style={styles.messageImageCover}
                  />
                </View>

                <View style={styles.messageTextContainer}>
                  <Text style={styles.interlocutor}>Marlene Kouame</Text>
                  <Text style={styles.messageText}>
                    Lorem Ipsum is simply dummy Lorem Ipsum has been the ind
                  </Text>
                </View>

                <View style={styles.messageTimeContainer}>
                  <Text style={styles.messageTimeDay}>07/08/2023</Text>
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
  editIconBox: {
    flex: 1,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  editIcon: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.grayVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },

  messageListContainer: {
    flex: 4,
    //padding: 15,
    paddingBottom:15,
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
  },
  interlocutor: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.gray,
    paddingTop: 5,
  },
  messageTimeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  messageText: {
    flex: 8,
    letterSpacing: 1,
  },
  messageTime: {
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 5,
    textAlign: 'right',
  },
  messageTimeDay: {
    fontSize: 12,
    paddingTop: 5,
    textAlign: 'right',
  },

  newMessageStatus: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 2,
    backgroundColor: COLORS.secondary,
  },
});
