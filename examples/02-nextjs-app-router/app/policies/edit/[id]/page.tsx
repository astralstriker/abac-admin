'use client'

import { ABACProvider, PolicyForm } from '@devcraft-ts/abac-admin-react-ui'
import '@devcraft-ts/abac-admin-react-ui/styles.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPolicyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [baseURL, setBaseURL] = useState('')

  useEffect(() => {
    setBaseURL(`${window.location.origin}/api/abac`)
  }, [])

  if (!baseURL) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ABACProvider config={{ baseURL }}>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.push('/policies')}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              ← Back to Policies
            </button>
          </div>
          <PolicyForm
            policyId={params.id}
            onSuccess={() => {
              router.push('/policies')
            }}
            onCancel={() => {
              router.push('/policies')
            }}
          />
        </div>
      </div>
    </ABACProvider>
  )
}
