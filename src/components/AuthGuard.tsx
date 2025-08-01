'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/utils/rtk/reducers/profileSlice';
import Spinner from './Spinner';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) {
                router.replace('/')
                return
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url, attempts(*)')
                .eq('id', user.id)
                .single()

            if (profile && !error) {
                dispatch(
                    setProfile({
                        id: user.id,
                        full_name: profile.full_name,
                        email: user.email ?? '',
                        avatar_url: profile.avatar_url,
                        attempts: profile.attempts,
                    })
                )
            }

            setLoading(false)
        }

        checkAuth()
    }, [dispatch, router])

    if (loading) return <Spinner />

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;