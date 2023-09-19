Rails.application.routes.draw do
  root "pages#dashboard" # Product home page, descriptions, call to action

  get "home" => "pages#home"
  get "dashboard" => "pages#dashboard", as: :dashboard

  # DEVISE PATHS #

  devise_for :users, controllers: {
    sessions: "users/sessions"
  },
  path: "/",
  path_names: {
    sign_in: "login",
    sign_out: "logout"
  },
  only: [:sessions]

  devise_for :users, controllers: {
    passwords: "users/passwords",
    registrations: "users/registrations",
    unlocks: "users/unlocks",
    confirmations: "users/confirmations",
    # omniauth_callbacks: "users/omniauth_callbacks",
  },
  path_names: {
    sign_up: :register,
  },
  skip: [:sessions]

  # RESOURCEFUL PATHS #

  resources :circles, param: :slug
  resources :themes, param: :slug
  resources :members
end
