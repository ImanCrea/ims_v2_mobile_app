import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, ROUTES } from '../../constants';

export default function RecentMessage({ navigation }: { navigation: any }) {
  return (
    <View style={styles.recentMessage}>
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
        </View>
  )
}


const styles = StyleSheet.create({
    recentMessage: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
      },
      recentMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
      },
      recentMessageItemContainer: {
        marginRight: 7,
      },
      recentMessageItem: {
        width: 85,
        minHeight: 125,
        alignItems: 'center',
        textAlign: 'center',
        padding: 0,
      },
      recentMessageImage: {
        alignItems: 'center',
        overflow: 'hidden',
        padding: 0,
        paddingBottom: 1,
      },
      recentMessageImageCover: {
        width: 65,
        height: 65,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
      },
      recentMessagetitle: {
        textAlign: 'center',
        fontWeight: '600',
      },
});