import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFieldworkData } from 'apiSdk/fieldwork-data';
import { fieldworkDataValidationSchema } from 'validationSchema/fieldwork-data';
import { JobInterface } from 'interfaces/job';
import { getJobs } from 'apiSdk/jobs';
import { FieldworkDataInterface } from 'interfaces/fieldwork-data';

function FieldworkDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FieldworkDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFieldworkData(values);
      resetForm();
      router.push('/fieldwork-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FieldworkDataInterface>({
    initialValues: {
      coordinates: '',
      elevation: 0,
      soil_profile: '',
      penetrometer_results: 0,
      job_id: (router.query.job_id as string) ?? null,
    },
    validationSchema: fieldworkDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Fieldwork Data',
              link: '/fieldwork-data',
            },
            {
              label: 'Create Fieldwork Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Fieldwork Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.coordinates}
            label={'Coordinates'}
            props={{
              name: 'coordinates',
              placeholder: 'Coordinates',
              value: formik.values?.coordinates,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Elevation"
            formControlProps={{
              id: 'elevation',
              isInvalid: !!formik.errors?.elevation,
            }}
            name="elevation"
            error={formik.errors?.elevation}
            value={formik.values?.elevation}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('elevation', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.soil_profile}
            label={'Soil Profile'}
            props={{
              name: 'soil_profile',
              placeholder: 'Soil Profile',
              value: formik.values?.soil_profile,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Penetrometer Results"
            formControlProps={{
              id: 'penetrometer_results',
              isInvalid: !!formik.errors?.penetrometer_results,
            }}
            name="penetrometer_results"
            error={formik.errors?.penetrometer_results}
            value={formik.values?.penetrometer_results}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('penetrometer_results', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<JobInterface>
            formik={formik}
            name={'job_id'}
            label={'Select Job'}
            placeholder={'Select Job'}
            fetcher={getJobs}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/fieldwork-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'fieldwork_data',
    operation: AccessOperationEnum.CREATE,
  }),
)(FieldworkDataCreatePage);
