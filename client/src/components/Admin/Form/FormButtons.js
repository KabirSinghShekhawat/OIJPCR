function ButtonGroup ({ handleSubmit, handleDelete, deleteTxt }) {
  return (
    <div className="flex flex-row justify-center">
      <Button handleClick={handleSubmit} cname="primary-color-bg text-white">
        Save Data
      </Button>
      <Button handleClick={handleDelete} cname="bg-red-600 text-white">
        {deleteTxt || 'Delete Article'}
      </Button>
    </div>
  )
}

function Button (props) {
  const { handleClick, cname } = props
  const btnCN = cname +
    ' block uppercase text-xl font-bold mx-auto p-4 rounded mt-8 w-64'
  return (
    <button
      className={btnCN}
      type="submit"
      onClick={handleClick}
    > {props.children}
    </button>
  )
}

export {Button, ButtonGroup}