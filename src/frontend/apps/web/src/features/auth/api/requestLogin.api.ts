'use server';

import { postRequest } from '@/src/shared/services';
import { cookies } from 'next/headers';

export const requestLogin = async (authorizationCode: string) => {
  const { user, token } = await postRequest<any, any>(
    'gateway',
    `/api/v1/user/login?authorizationCode=${authorizationCode}`,
    {
      platform: 'KAKAO',
      redirectUri: process.env.KAKAO_REDIRECT_URI,
    },
  );

  const cookieOptions = {
    secure: process.env.MODE === 'production',
  };
  cookies().set('userId', user.userId, cookieOptions);
  cookies().set('accessToken', token.accessToken, cookieOptions);
  cookies().set('refreshToken', token.refreshToken, cookieOptions);
};
