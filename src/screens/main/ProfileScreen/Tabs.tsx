import { Icon, IconProps, Text } from '@rneui/themed';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Poppins } from '../../../utils';

interface TabProps {
  name: string;
  label: string;
  icon: IconProps;
}

interface TabsProps {
  tabs: TabProps[];
  selected: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = (props: TabsProps) => {
  const { tabs, selected, onChange } = props;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
        paddingHorizontal: 16,
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => onChange(tab.name)}
          style={{
            backgroundColor:
              selected === tab.name
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.05)',
            padding: 16,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon
              type='material-community'
              color={
                selected === tab.name
                  ? 'rgba(255,255,255,0.75)'
                  : 'rgba(255,255,255,0.5)'
              }
              {...tab.icon}
            />
            <Text
              style={{
                fontFamily: Poppins.REGULAR,
                color:
                  selected === tab.name
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgba(255,255,255,0.5)',
              }}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default Tabs;
