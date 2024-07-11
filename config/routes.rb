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
  get "/", to: redirect("/circles"), as: "home"

  # RESOURCEFUL PATHS #

  resources :users
  resources :people, param: :slug

  delete 'orgs', to: 'orgs#destroy'
  delete 'groups', to: 'groups#destroy'

  resources :circles, param: :slug do
    get :about

    resources(
      :groups,
      shallow: true,
      param: :slug,
      path: :groups,
    )

    resources :members, concerns: :bulk_delete, param: :slug

    resources :orgs, param: :slug, except: [:create] do
      get :about
    end

    resources :presentation_templates, concerns: :bulk_delete, param: :slug

    resources :themes, param: :slug do
      get :about

      get 'members', to: 'theme_members#index'
      resources(
        :theme_members,
        only: [:show, :new, :edit],
        path: :members,
        param: :slug,
        as: 'member',
      )

      get 'orgs', to: 'theme_orgs#index'
      get 'orgs/import', to: 'theme_orgs#import', as: :orgs_import
      resources(
        :theme_orgs,
        path: :orgs,
        param: :slug,
        as: 'org',
      )
    end

    resources :themes, shallow: true, param: :slug, only: [] do
      resources :presentations, concerns: :bulk_delete
    end
  end

  get "presentation/:id", to: "presentations#run_presentation", as: :run_presentation

  # SETTINGS PAGES #

  namespace :settings do
    get "/", to: redirect("/settings/general")
    [:general, :appearance, :integrations, :localizations, :notifications].freeze.each do |path|
      get path, to: "#{path}#index"
      patch path, to: "#{path}#update"
    end
  end

  draw(:api)
end
