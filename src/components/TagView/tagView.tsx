import React, { useCallback, useRef, useState } from "react";
import Icon from "../Icon/icon";
import classNames from "classnames";

export type tagType = { id: string; title: string; isActive: boolean };

interface TagViewProps {
  /** tag数据 */
  tags: tagType[];
  /** 点击触发的函数 */
  onTagClick?: (idx: number, id: string) => void;
  /** 删除触发的函数 */
  onTagDeleteClick?: (idx: number, id: string) => void;
}
/**
 * 管理端常见的交互组件，用来展示已经打开的页面路由标题。（一般配合路由缓存使用）
 * ### 使用：
 *
 * ~~~js
 * import { TagView } from 'orangui'
 * ~~~
 *
 * ### 示例：
 */
export const TagView: React.FC<TagViewProps> = (props) => {
  const { tags, onTagClick, onTagDeleteClick } = props;
  const [deleteIdx, setDeleteIdx] = useState(-1);

  const tagClick = useCallback(
    (e: React.MouseEvent) => {
      const idx = e.currentTarget.getAttribute("data-idx");
      const id = e.currentTarget.getAttribute("data-id");
      if (onTagClick) {
        onTagClick(Number(idx), id ? id : "");
      }
    },
    [onTagClick]
  );
  const tagCloseClick = useCallback(
    (e: React.MouseEvent) => {
      const idx = e.currentTarget.getAttribute("data-idx");
      const id = e.currentTarget.getAttribute("data-id");
      const index = Number(idx);
      setDeleteIdx(index);
      setTimeout(() => {
        if (onTagDeleteClick) {
          setDeleteIdx(-1);
          onTagDeleteClick(index, id ? id : "");
        }
      }, 150);
      e.stopPropagation();
    },
    [onTagDeleteClick]
  );

  return (
    <ul className="tagview">
      {tags.map((item, index) => {
        const tagClass = classNames("tag", {
          "tag-active": item.isActive,
          "tag-delete": index === deleteIdx,
        });
        return (
          <li
            className={tagClass}
            key={item.id}
            onClick={tagClick}
            data-idx={index}
            data-id={item.id}
          >
            <span>{item.title}</span>
            <Icon
              icon="xmark"
              size="xs"
              className="icon"
              onClick={tagCloseClick}
              data-idx={index}
              data-id={item.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

TagView.defaultProps = {};
export default TagView;
