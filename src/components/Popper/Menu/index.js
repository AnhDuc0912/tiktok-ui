import Tippy from "@tippyjs/react/headless";
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper/index';
import MenuItem from "./MenuItem";
import Heading from "./Heading";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {}

function Menu({children, items = [], onChange = defaultFn}) {
    const [history, setHistory] = useState([{ data: items}]);
    const current = history[history.length - 1];
  
    const renderItems = () => {
      return current.data.map((item, index) => {
        const isParent = !!item.children

        return (
          <MenuItem 
            key={index} 
            data={item} 
            onClick={() => {
              if(isParent){
                setHistory((prev) => [...prev, item.children]);
              } else {
                onChange(item)
              }
            }}
          />)
      })
    }

    return ( 
        <Tippy
          interactive
          appendTo="parent"
          placement="bottom-end"
          delay={[0, 1000]}
          render={(attrs) => (
            <div className={cx('menu-list')} {...attrs}>
              <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                  <Heading 
                    title={current.title} 
                    onBack={() =>{
                      setHistory(prev => prev.slice(0, prev.length - 1))
                    }}
                    />
                  )}
                {renderItems()}
              </PopperWrapper>
            </div>
          )}
          onHide={() => {setHistory(prev => prev.slice(0, 1))}}
        >
          {children}
        </Tippy>
     );
}

export default Menu;