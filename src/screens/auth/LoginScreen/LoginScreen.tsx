import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Vibration,
  View,
} from 'react-native';
import { PrimaryButton } from '../../../components/buttons';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { supabase } from '../../../supabase';

type LoginProps = NativeStackScreenProps<MainStackParamList, 'Login'>;

const Login = (props: LoginProps) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Vibration.vibrate(500);
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <View
        style={{
          height: Dimensions.get('screen').height,
          overflow: 'hidden',
          backgroundColor: theme.colors.secondary,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 64,
            paddingHorizontal: 16,
            overflow: 'hidden',
            backgroundColor: 'white',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Platform.OS === 'ios' && { flex: 1 }}
          >
            <ScrollView bounces={false}>
              <View
                style={{
                  alignItems: 'center',
                  padding: 64,
                }}
              >
                <Image
                  source={{ uri: 'https://i.imgur.com/Sfn2JIY.png' }}
                  containerStyle={{
                    aspectRatio: 1,
                    width: '100%',
                    height: 175,
                  }}
                />
              </View>
              <Input
                keyboardType='email-address'
                leftIcon={{
                  type: 'ionicon',
                  name: 'mail-outline',
                  color: 'rgba(0,0,0,0.35)',
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder='Email'
                autoCapitalize={'none'}
                inputContainerStyle={{
                  paddingVertical: 16,
                }}
                leftIconContainerStyle={{
                  marginRight: 8,
                }}
              />
              <Input
                containerStyle={{ marginTop: -24 }}
                leftIcon={{
                  type: 'ionicon',
                  name: 'lock-closed-outline',
                  color: 'rgba(0,0,0,0.35)',
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder='Password'
                autoCapitalize={'none'}
                inputContainerStyle={{
                  paddingVertical: 16,
                }}
                leftIconContainerStyle={{
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  marginTop: -8,
                  textAlign: 'right',
                  color: theme.colors.primary,
                  fontWeight: '600',
                }}
              >
                Forgot password
              </Text>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 32,
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <PrimaryButton
            variant='ghost'
            title='Sign up'
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
          <PrimaryButton
            variant='solid'
            title='Sign in'
            disabled={loading}
            onPress={() => signInWithEmail()}
            titleStyle={{ fontFamily: 'Poppins_400Regular' }}
          />
        </View>
      </View>
    </>
  );
};

export default Login;
