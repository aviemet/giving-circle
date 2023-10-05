Rails.application.routes.draw do
  root "circles#index" # Product home page, descriptions, call to action

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

  # SETTINGS PAGES #

  namespace :settings do
    get "/", to: redirect("/settings/general")
    resources :general
    resources :appearance, only: [:index]
    match :appearance, to: "appearance#update", via: [:put, :patch]
    resources :integrations
    resources :localizations
    resources :notifications
    resources :integrations, path: :mail
  end
end
