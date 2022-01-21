import React, { useRef } from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  id: string;
  complete?: boolean;
  onRemove?: (id: string) => void;
  onClick?: (id: string) => void;
}

const List = (props: Props) => {
  const { id, children, complete, onRemove, onClick } = props;
  const ref = useRef<HTMLLIElement>(null);

  // const [taskComplete, setTask] = useState(complete);

  // const handleStatusTask = () => {
  //   return setTask(!taskComplete);
  // }

  // const handleRemoveTask = () => {
  //   return ref?.current?.remove();
  // }

  const taskProps = {
    ...(onClick) && {
      onClick: () => onClick(id)
    }
  }

  const removeTaskProps = {
    ...(onRemove) && {
      onClick: () => onRemove(id)
    }
  }

  return (
    <>
      <li 
        id={id}
        ref={ref}
        className="App_task_item"
      >
        <div className={cn("task_content", complete && "task_complete")} {...taskProps}>
          <span className="task_name">{children}</span>
        </div>
        <button className="task_delete_button" {...removeTaskProps}>
          <svg className="svg_icon" viewBox="0 0 512 512" width={24} height={24}>
            <path fill="currentColor" d="M289.9,256l95-95c9.4-9.4,9.4-24.6,0-34s-24.6-9.4-34,0l0,0l-95,95l-95-95c-9.4-9.4-24.6-9.4-34,0s-9.4,24.6,0,34l95,95
            l-95,95c-9.4,9.4-9.4,24.6,0,34s24.6,9.4,34,0l95-95l95,95c9.4,9.4,24.6,9.4,34,0s9.4-24.6,0-34L289.9,256z"/>
          </svg>
        </button>
      </li>
    </>
  )
}

export default List;
