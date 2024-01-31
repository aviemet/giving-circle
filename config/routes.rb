# == Route Map
#

Rails.application.routes.draw do
  root "pages#home" # Public home page for entire project

  # CONCERNS #

  concern :bulk_delete do
    collection do
      delete :destroy
    end
  end

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

  scope :admin, module: "admin" do
    get "/", to: redirect("/admin/circles"), as: "home"

    # RESOURCEFUL PATHS #

    resources :users

    resources :circles, shallow: true, param: :slug do
      resources :themes, shallow: true, param: :slug do
        resources :orgs, concerns: :bulk_delete, param: :slug
        resources :members, concerns: :bulk_delete, param: :slug
        resources :presentations, concerns: :bulk_delete
      end
      resources :members, except: [:create, :update]
    end

    # SETTINGS PAGES #

    namespace :settings do
      get "/", to: redirect("/admin/settings/general")
      [:general, :appearance, :integrations, :localizations, :notifications].freeze.each do |path|
        get path, to: "#{path}#index"
        patch path, to: "#{path}#update"
      end
    end

  end

  # PUBLIC PAGES #

  namespace :public, path: "" do
    resources :circles, only: [:index, :show], param: :slug do
      resources :themes, only: [:index, :show], param: :slug
      resources :orgs, only: [:index, :show], param: :slug
    end
  end
end
