'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { requestLogin } from '../api/requestLogin.api';

export const useLoginRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      alert('인가 코드가 없습니다. 다시 로그인 해주세요.');
      router.replace('/');
      return;
    }

    const fetchLogin = async () => {
      try {
        const user = await requestLogin(code);
        if (!user) {
          throw new Error('사용자 정보가 없습니다.');
        }
        localStorage.setItem('user', JSON.stringify(user));
        router.replace('/stock');
      } catch (err) {
        console.error('로그인 실패:', err);
        alert('로그인에 실패했습니다. 다시 로그인 해주세요.');
        router.replace('/');
      }
    };

    fetchLogin();
  }, [code]);
};
