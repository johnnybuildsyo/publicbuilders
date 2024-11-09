"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import BuilderProfileForm from "./builder-profile-form"
import BuilderProfileCardSuccess from "./builder-profile-card-success"
import { useBuilderProfileSubmit } from "@/components/hooks/useBuilderProfileSubmit"

export default function BuilderProfileCard(): JSX.Element {
  const { onSubmit, isLoading, hasSubmitted, submittedWithoutCaptcha } = useBuilderProfileSubmit()

  if (hasSubmitted) {
    return <BuilderProfileCardSuccess />
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground/70 tracking-wider font-extrabold -mb-2">Submit Builder Profile</CardTitle>
        <CardDescription>Must #buildinpublic to get considered for publicbuilders.org</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="bg-amber-200 border-none mb-4">
          <InfoIcon className="h-8 w-8 opacity-50" />
          <div className="!pl-12 pt-1">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>As part of our #buildinpublic mission, once you send your profile submission, it will be public.</AlertDescription>
          </div>
        </Alert>
        <BuilderProfileForm {...{ isLoading, submittedWithoutCaptcha, onSubmit }} />
      </CardContent>
    </Card>
  )
}
