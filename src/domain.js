import React from 'react'
import * as R from 'ramda'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

export const Domain = ({id=null, domainName='domainName undefined', emailQuota=0, initializeDomain=R.identity, deleteDomain=R.identity} = {}) => {

  return (
    <Card className='card'>
      <CardContent>
        <Typography variant="h6">
          {domainName} {emailQuota} GB
        </Typography>
      </CardContent>
      <div style={{ margin: "1em" }}>
        <UpdateIcon
          style={{ color: "green" }}
          onClick={() => initializeDomain(id, domainName, emailQuota)}
        />
        <DeleteIcon
          style={{ color: "red" }}
          onClick={() => deleteDomain(id)}
        />
      </div>
    </Card>
  )
}
