import { Fragment } from 'react'
import { fetchGitHubToken } from '@cloud/_api/fetchGitHubToken'
import { fetchInstalls } from '@cloud/_api/fetchInstalls'
import { fetchMe } from '@cloud/_api/fetchMe'
import { fetchTemplate } from '@cloud/_api/fetchTemplate'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Breadcrumbs } from '@components/Breadcrumbs'
import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { CloneTemplate } from './page_client'

const title = `Create new from template`

export default async ({ params: { 'template-slug': templateSlug } }) => {
  const { user } = await fetchMe()

  if (!user) {
    redirect(
      `/login?redirect=${encodeURIComponent(
        `/new/clone/${templateSlug}`,
      )}&warning=${encodeURIComponent('You must first log in to clone this template')}`,
    )
  }

  const token = await fetchGitHubToken()

  if (!token) {
    redirect(`/new/authorize?redirect=${encodeURIComponent(`/new/clone/${templateSlug}`)}`)
  }

  const template = await fetchTemplate(templateSlug)

  if (!template) {
    redirect(`/new/clone?message=${encodeURIComponent('Template not found')}`)
  }

  const installs = await fetchInstalls()

  return (
    <Fragment>
      <Gutter>
        <Breadcrumbs
          items={[
            {
              label: 'New',
              url: '/new',
            },
            {
              label: 'Clone',
              url: '/new/clone',
            },
            {
              label: template?.name,
            },
          ]}
        />
        <Heading marginTop={false} element="h1">
          {title}
        </Heading>
      </Gutter>
      {<CloneTemplate template={template} installs={installs} user={user} />}
    </Fragment>
  )
}

export async function generateMetadata({ params: { template } }): Promise<Metadata> {
  return {
    title: 'Clone Template | Payload Cloud',
    openGraph: mergeOpenGraph({
      url: `/new/clone/${template}`,
    }),
  }
}
