'use client'

import * as React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { Label } from '@components/Label'
import { ExtendedBackground } from '@root/app/_components/ExtendedBackground'
import { BranchIcon } from '@root/graphics/BranchIcon'
import { CommitIcon } from '@root/graphics/CommitIcon'
import { useRouteData } from '../../../../context'

import classes from './page.module.scss'

const exampleLog = [
  'Cloning your repo at https://xxx.com',
  'Cloned successfully.',
  'Running install command `yarn`.',
  'Install complete.',
  'Running build command `yarn build`.',
  'Build complete.',
  'Starting Node process...',
  'Successfully started.',
  'Build is live!',
]

export default () => {
  const { project } = useRouteData()
  const [status, setStatus] = React.useState('offline')

  return (
    <React.Fragment>
      <ExtendedBackground
        pixels
        upperChildren={
          <Grid>
            <Cell start={1} cols={4} colsM={8}>
              <Label>Deployment URL</Label>
              <p className={classes.detail}>alijweaefa.cloud.payloadcms.com</p>
            </Cell>

            <Cell start={5} cols={3} startS={1} colsM={8}>
              <Label>Deployed At</Label>
              <p className={classes.detail}>January 24nd, 2023 4:20pm</p>
            </Cell>

            <Cell start={9} cols={4} startM={1} colsM={8}>
              <Label>Status</Label>
              <div className={classes.statusDetail}>
                <div
                  className={[classes.statusIndicator, classes[`status--${status}`]]
                    .filter(Boolean)
                    .join(' ')}
                />
                <p className={classes.detail}>Offline</p>
              </div>
            </Cell>
          </Grid>
        }
        lowerChildren={
          <div className={classes.reTriggerBackground}>
            <Button
              onClick={() => {
                console.log('redeploy')
              }}
              label="Trigger Redeploy"
              appearance="secondary"
            />

            <div className={classes.deployDetails}>
              <div className={classes.iconAndLabel}>
                <BranchIcon />
                <p>main</p>
              </div>
              <div className={classes.iconAndLabel}>
                <CommitIcon />
                <p>32rf343: some message</p>
              </div>
            </div>
          </div>
        }
      />

      <Heading element="h5" className={classes.consoleHeading}>
        Latest build logs
      </Heading>

      <ExtendedBackground
        upperChildren={
          <code className={classes.console}>
            {exampleLog.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </code>
        }
      />
    </React.Fragment>
  )
}
