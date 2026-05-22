import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import { Fragment } from 'react'

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return <Redirect href={'/'} />
    }

    return (
        <>
            <StatusBar
                barStyle='dark-content'
                backgroundColor='black'
                hidden={false}
            />
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}