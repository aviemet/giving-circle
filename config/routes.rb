Rails.application.routes.draw do
  root "pages#home"

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

  scope :admin do
    get "/", to: redirect("/admin/circles")

    # RESOURCEFUL PATHS #

    resources :circles, param: :slug do
      resources :themes, param: :slug
      resources :members
      resources :orgs, param: :slug
    end

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

end
