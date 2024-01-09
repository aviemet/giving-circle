Rails.application.routes.draw do
  root "pages#home" # Public home page for entire project

  # DEVISE PATHS #

  devise_for(
    :users,
    controllers: {
      sessions: "users/sessions"
    },
    path: "/",
    path_names: {
      sign_in: "login",
      sign_out: "logout"
    },
    only: [:sessions],
  )

  devise_for(
    :users,
    controllers: {
      passwords: "users/passwords",
      registrations: "users/registrations",
      unlocks: "users/unlocks",
      confirmations: "users/confirmations",
      # omniauth_callbacks: "users/omniauth_callbacks",
    },
    path_names: {
      sign_up: :register,
    },
    skip: [:sessions],
  )

  namespace :admin do
    get "/", to: redirect("/admin/circles")

    # RESOURCEFUL PATHS #

    resources :circles, param: :slug do
      resources :themes, except: [:create, :update], param: :slug do
        resources :members
        resources :orgs, param: :slug
        resources :presentations
      end
      resources :members, except: [:create, :update]
      resources :orgs, except: [:create, :update], param: :slug
    end

    resources :themes, only: [:create, :update]
    resources :orgs, only: [:create, :update]
    resources :members, only: [:create, :update]

    # SETTINGS PAGES #

    namespace :settings do
      get "/", to: redirect("/admin/settings/general")
      resources :general, only: [:index, :update]
      resources :appearance, only: [:index, :update]
      resources :integrations, only: [:index, :update]
      resources :localizations, only: [:index, :update]
      resources :notifications, only: [:index, :update]
      resources :integrations, only: [:index, :update], path: :mail
    end

  end

  # PUBLIC PAGES #

  resources :circles, only: [:index, :show], param: :slug do
    resources :themes, only: [:index, :show], param: :slug
    resources :orgs, only: [:index, :show], param: :slug
  end

end
