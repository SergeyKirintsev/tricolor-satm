export class Card {
  static update(cardId, user, comment = null) {
    const url =
      "https://tricolor-77333.firebaseio.com/cards/" + cardId + ".json";
    // const card2 = { completed: true };
    //console.log(url);

    let fetchBody

      if (comment==null) {
        fetchBody = { completed: true, author: user }
    } else {
        fetchBody = { comment }
    }

    return fetch(url, {
      method: "PATCH",
      // body: JSON.stringify({ completed: true, author: user }),
      body: JSON.stringify(fetchBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then((response) => response.json())
      // .then((response) => {
      //   console.log(response);
      // });
  }

  static create(card) {
    return fetch("https://tricolor-77333.firebaseio.com/cards.json", {
      method: "POST",
      body: JSON.stringify(card),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }

  static fetch() {
    // if (!token) {
    //   return Promise.resolve('<p class="error">У вас нет токена</p>');
    // }
    return fetch(
      `https://tricolor-77333.firebaseio.com/cards.json`
      // `https://tricolor-77333.firebaseio.com/cards.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : [];
      });
  }

  static listToHTML(cards) {
    return cards.length
      ? `<ol>${cards
          .map(
            (card) =>
              `<li>${new Date(card.date).toLocaleDateString()}" "${
                card.comment
              }</li>`
          )
          .join("")}</ol>`
      : `<p>Вопросов пока нет</p>`;
  }
}
