"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LoginForm } from "./login/LoginForm"
import { RegisterForm } from "./register/RegisterForm"

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="">
      
      <TabsList variant='line' className="grid grid-cols-2 w-full">
        <TabsTrigger variant='custom' value="login">Logga in</TabsTrigger>
        <TabsTrigger variant='custom' value="register">Skapa konto</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-6">
        <LoginForm />
      </TabsContent>

      <TabsContent value="register" className="mt-6">
        <RegisterForm />
      </TabsContent>

    </Tabs>
  )
}