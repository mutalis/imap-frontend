import React from 'react'
import * as R from 'ramda'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

export const Email = ({id=null, username='username undefined', quota=0, initializeEmail=R.identity, deleteEmail=R.identity} = {}) => {

  return (
    <Card className='card'>
      <CardContent>
        <Typography variant="h6">
          {username} {quota} GB
        </Typography>
      </CardContent>
      <div style={{ margin: "1em" }}>
        <UpdateIcon
          style={{ color: "green" }}
          onClick={() => initializeEmail(id, username, quota)}
        />
        <DeleteIcon
          style={{ color: "red" }}
          onClick={() => deleteEmail(id)}
        />
      </div>
    </Card>
  )
}
