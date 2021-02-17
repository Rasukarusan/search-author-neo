import { useState, useRef } from 'react'
import { TextField, Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const CopyField = ({ titles, selectList }) => {
  const field = useRef<HTMLTextAreaElement>(null)
  const getList = () => {
    let list = ''
    titles.forEach((title: string) => {
      const authors = title in selectList ? selectList[title].authors : '-'
      list += title + '\t' + authors + '\n'
    })
    return list
  }
  const fieldValue = getList()

  const [open, setOpen] = useState(false)
  const handleOnClick = () => {
    navigator.clipboard.writeText(fieldValue)
    setOpen(true)
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Copied!
        </Alert>
      </Snackbar>
      <TextField
        inputRef={field}
        style={{
          width: '50%',
          display:
            Object.keys(selectList).length === 0 ? 'none' : 'inline-flex',
        }}
        defaultValue={fieldValue}
        multiline
        rows={Object.keys(selectList).length === 0 ? 1 : 10}
        disabled
        variant="outlined"
        onClick={handleOnClick}
      />
    </>
  )
}