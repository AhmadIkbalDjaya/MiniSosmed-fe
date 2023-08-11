/* eslint-disable react/prop-types */
export default function InvalideMessage(props) {
  return (
    <div className={"pt-1 text-xs text-red-600"}>{props.children}</div>
  );
}
