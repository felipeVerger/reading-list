import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../client';
import { userQuery } from '../../utils/queries';
import { Maybe } from 'yup';
import { verifyPassword } from '../../utils/function';

interface UserData {
    username: Maybe<string | undefined>
    email: string;
    password: string;
    image: {
        _type: string,
        asset: {
          _type: string,
          _ref: string | undefined
        }
      };
    salt: string
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, password, image, salt }: UserData, { rejectWithValue }) => {
        try {
            const doc = {
                _id: uuidv4(),
                _type: 'user',
                username,
                email,
                password,
                salt,
                image
            };
            // check if the username or the email already exists in the database
            const query = userQuery(email);
            await client.fetch(query).then((res) => {
                if (res[0]?.email === email) {
                    throw new Error('This email is already registered');
                } else if (res[0]?.username === username) {
                    throw new Error('This username is already registered')
                }
            })
            
            const data = await client.createIfNotExists(doc);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

interface UserDataLogin {
    email: string;
    password: string;
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: UserDataLogin, { rejectWithValue }) => {
        try {
            const query = userQuery(email);

            const data = await client.fetch(query)
                .then((res) => {
                    console.log(res);
                    
                    const isPasswordValid = verifyPassword(password, res[0]?.password);
                    if(res[0]?.email === email && isPasswordValid) {
                        localStorage.setItem('user', JSON.stringify(res));
                        return res
                    } else {
                        console.log('error validating pass and email');
                        
                        throw new Error("The email or the password are invalid")
                    }
                })
                .catch((error) => {
                    console.log("error");
                    throw new Error(error)
                })
            return {
                payload: data
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)