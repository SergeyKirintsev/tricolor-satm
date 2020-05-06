import React from "react";
import { Appbar } from "muicss/react";
import { createModal } from "../util";
import { getAuthForm, authWithEmailAndPassword } from "../auth";
import { Card } from "../card";

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("button");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Card.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  console.log(content);
  if (typeof content === "string") {
    createModal("Ошибка", content);
  } else {
    createModal("Список заказов", Card.listToHTML(content));
  }
}

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function HeaderOld() {
  let s1 = { verticalAlign: "middle" };
  let s2 = { textAlign: "right" };
  return (
    <Appbar>
      <table width="100%">
        <tbody>
          <tr style={s1}>
            <td className="mui--appbar-height mui--text-title">Триколор</td>
            <td className="mui--appbar-height" style={s2}>
              <button
                onClick={openModal}
                className="mui-btn mui-btn--raised mui-btn--primary"
              >
                LOGIN
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Appbar>
  );
}

export default HeaderOld;
