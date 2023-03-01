import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Title,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Box,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import { toast } from 'react-toastify';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (type === 'login') {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/users/login`, {
          email: form.values.email,
          password: form.values.password,
        })
        .then((res) => {
          if (res.status == 200) {
            auth.login(res.data.userId, res.data.token);
            navigate('/');
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/users/signup`, {
          name: form.values.name,
          email: form.values.email,
          password: form.values.password,
        })
        .then((res) => {
          if (res.status == 201) {
            auth.login(res.data.userId, res.data.token);
            navigate('/');
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className='login' style={{ backgroundImage: 'url(/login.jpg)' }}>
      <Paper className='form' radius={0} p={30}>
        <Title order={2} mt='md' mb={50} style={{ color: 'white' }}>
          {type === 'register'
            ? 'Create an Account'
            : 'Login in to your account'}
        </Title>

        <Anchor color='dimmed' size='sm' onClick={() => navigate('/')}>
          <Center inline mb={20}>
            <IconArrowLeft size={12} stroke={1.5} />
            <Box ml={5}>Back to Homepage</Box>
          </Center>
        </Anchor>

        <form onSubmit={authSubmitHandler}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label='Name'
                placeholder='Your name'
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label='Email'
              placeholder='test@gmail.com'
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />

            {type === 'register' && (
              <Checkbox
                label='I accept terms and conditions'
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => toggle()}
              size='xs'
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type='submit'>{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
