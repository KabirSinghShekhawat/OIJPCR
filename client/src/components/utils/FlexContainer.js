export default function FlexContainer(props) {
  return (
    <div className={`flex-grow ${props.cname}`}>
      {props.children}
    </div>
  )
}