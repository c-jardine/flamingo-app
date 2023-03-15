import { Divider, Text } from '@rneui/themed';
import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Checkbox, KInput } from '../../../components/inputs';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';

const DetailsForm = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<ProfileProps>();

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <View style={{ paddingVertical: 32 }}>
        <Controller
          name='job_title'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Job title'
              placeholder='Graphic Designer'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.job_title?.message as string}
              errorStyle={{
                display: errors.job_title ? 'flex' : 'none',
              }}
            />
          )}
        />
        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='education'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Education'
              placeholder='B.S. Computer Science @ Ohio State University'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.education?.message as string}
              errorStyle={{
                display: errors.education ? 'flex' : 'none',
              }}
            />
          )}
        />
        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='political_affiliation'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Political affiliations'
              placeholder='Democrat'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.political_affiliation?.message as string}
              errorStyle={{
                display: errors.political_affiliation ? 'flex' : 'none',
              }}
            />
          )}
        />
        <Divider style={{ marginVertical: 16 }} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontFamily: Poppins.MEDIUM, color: 'black' }}>
              Drinker
            </Text>
            <Controller
              name='is_drinker'
              control={control}
              render={({ field }) => <Checkbox {...field} />}
            />
          </View>
          {errors.is_drinker && (
            <Text
              style={{
                marginTop: 12,
                color: 'red',
                fontSize: 12,
                paddingHorizontal: 10,
              }}
            >
              {errors.is_drinker?.message}
            </Text>
          )}
        </View>
        <Divider style={{ marginVertical: 16 }} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontFamily: Poppins.MEDIUM, color: 'black' }}>
              Smoker
            </Text>
            <Controller
              name='is_smoker'
              control={control}
              render={({ field }) => <Checkbox {...field} />}
            />
          </View>
          {errors.is_smoker && (
            <Text
              style={{
                marginTop: 12,
                color: 'red',
                fontSize: 12,
                paddingHorizontal: 10,
              }}
            >
              {errors.is_smoker?.message}
            </Text>
          )}
        </View>
        <Divider style={{ marginVertical: 16 }} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontFamily: Poppins.MEDIUM, color: 'black' }}>
              Stoner
            </Text>
            <Controller
              name='is_stoner'
              control={control}
              render={({ field }) => <Checkbox {...field} />}
            />
          </View>
          {errors.is_stoner && (
            <Text
              style={{
                marginTop: 12,
                color: 'red',
                fontSize: 12,
                paddingHorizontal: 10,
              }}
            >
              {errors.is_stoner?.message}
            </Text>
          )}
        </View>
        <Divider style={{ marginVertical: 16 }} />
      </View>
    </ScrollView>
  );
};
export default DetailsForm;
