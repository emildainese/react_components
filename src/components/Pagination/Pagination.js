import React, { Fragment, useEffect } from 'react';
import classes from './Pagination.module.scss';
import { usePagination } from '../../hooks/pagination';

const Pagination = (props) => {
  const pageRefs = [];
  let pages = [];

  const {
    max,
    page,
    active,
    range,
    prevPage,
    nextPage,
    onPageChange,
  } = usePagination(props.count);

  for (let i = 1; i <= props.count; ++i) {
    pageRefs[i] = React.createRef();
    pages.push(
      <li key={i}>
        <button
          className={`${classes.Page} ${
            active && page === i ? classes.Active : ''
          }`}
          id={i}
          ref={pageRefs[i]}
          onClick={(e) => {
            onPageChange(e);
            props.onPageChange(e.target.id);
          }}
        >
          {i}
        </button>
      </li>
    );
  }

  useEffect(() => {
    pageRefs.forEach((page) => {
      if (
        page.current &&
        page.current.classList.contains(`${classes.Active}`)
      ) {
        page.current.classList.remove(`${classes.Active}`);
      }
    });

    if (pageRefs[page].current)
      pageRefs[page].current.classList.add(`${classes.Active}`);
  }, [page, pageRefs, range]);

  const paginationLayout =
    props.count >= 10 ? (
      <Fragment>
        <PaginationArrow
          direction="left"
          prevPage={prevPage}
          page={page}
          count={props.count}
          onPageChange={props.onPageChange}
        />
        {pages[0]}
        {page >= max ? <Dots /> : pages[1]}
        {pages.slice(range[0], range[1])}
        {page <= max ? <Dots /> : pages[props.count - 2]}
        {pages[props.count - 1]}
        <PaginationArrow
          direction="right"
          nextPage={nextPage}
          page={page}
          count={props.count}
          onPageChange={props.onPageChange}
        />
      </Fragment>
    ) : (
      <Fragment>
        <PaginationArrow
          direction="left"
          prevPage={prevPage}
          page={page}
          count={props.count}
          onPageChange={props.onPageChange}
        />
        {pages}
        <PaginationArrow
          direction="right"
          nextPage={nextPage}
          page={page}
          count={props.count}
          onPageChange={props.onPageChange}
        />
      </Fragment>
    );

  return (
    <nav className={classes.PaginationNav}>
      <div className={classes.Data}></div>
      <ul className={classes.Pagination}>{paginationLayout}</ul>
    </nav>
  );
};

export default Pagination;

const PaginationArrow = (props) => {
  const { page, count } = props;

  const onPrevClick = (page) => {
    props.prevPage();
    props.onPageChange(page - 1);
  };

  const onNextClick = (page) => {
    props.nextPage();
    props.onPageChange(page + 1);
  };

  const arrow =
    props.direction === 'left' ? (
      <li>
        <button
          className={classes.PrevPage}
          onClick={() => onPrevClick(page)}
          disabled={page === 1}
        >
          <i className={`fas fa-chevron-left ${classes.Chevron}`}></i>
        </button>
      </li>
    ) : (
      <li>
        <button
          className={classes.NextPage}
          onClick={() => onNextClick(page)}
          disabled={page === count}
        >
          <i className={`fas fa-chevron-right ${classes.Chevron}`}></i>
        </button>
      </li>
    );
  return arrow;
};

const Dots = () => {
  return (
    <li>
      <div className={classes.Dots}>...</div>
    </li>
  );
};
