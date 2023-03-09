import { Image, Input, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { PrimaryButton } from '../../components/buttons';
// import { Input } from '../../components/inputs';
import { MainLayout } from '../../layouts';
import { supabase } from '../../supabase';

const LoginScreen = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <MainLayout>
      <>
        <View
          style={{
            paddingTop: 64,
            paddingBottom: 32,
            paddingHorizontal: 32,
            backgroundColor: 'white',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
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
              marginTop: -24,
              textAlign: 'right',
              color: theme.colors.primary,
              fontWeight: '600',
            }}
          >
            Forgot password
          </Text>
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
      </>
    </MainLayout>
  );
};

export default LoginScreen;
