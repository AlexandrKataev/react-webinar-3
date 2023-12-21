export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (articleId) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: {
            data: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  create: (commentDto) => {
    console.log(commentDto);
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/create-start" });

      try {
        await services.api.request({
          url: `api/v1/comments`,
          body: JSON.stringify(commentDto),
          method: "POST",
        });
        dispatch(this.load(getState().article.data._id));
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/create-error" });
      }
    };
  },
};
