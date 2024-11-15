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

  # Explicitly define routes for Circle to use :circle_slug
  get 'circles/:circle_slug', to: 'circles#show', as: 'circle'
  get 'circles/:circle_slug/edit', to: 'circles#edit', as: 'edit_circle'
  patch 'circles/:circle_slug', to: 'circles#update'
  put 'circles/:circle_slug', to: 'circles#update'
  delete 'circles/:circle_slug', to: 'circles#destroy'

  # Nested resources under Circle with standard slug param
  resources :circles, param: :slug, only: [:new, :index, :create] do
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

    # Explicitly define routes for Theme to use :theme_slug
    get 'themes/:theme_slug', to: 'themes#show', as: 'theme'
    get 'themes/:theme_slug/edit', to: 'themes#edit', as: 'edit_theme'
    patch 'themes/:theme_slug', to: 'themes#update'
    put 'themes/:theme_slug', to: 'themes#update'
    delete 'themes/:theme_slug', to: 'themes#destroy'
    resources :themes, param: :slug, only: [:new, :index, :create] do
      get :about

      # get 'members', to: 'theme_members#index'
      # resources(
      #   :theme_members,
      #   path: :members,
      #   param: :slug,
      #   as: 'member',
      # )

      get 'orgs', to: 'theme_orgs#index'
      get 'orgs/import', to: 'theme_orgs#import', as: :orgs_import
      resources(
        :theme_orgs,
        path: :orgs,
        param: :slug,
        except: [:index],
        as: 'org',
      )

      # Admin presentation routes
      get 'presentations/:presentation_slug', to: 'presentations#show', as: 'presentation'
      get 'presentations/:presentation_slug/edit', to: 'presentations#edit', as: 'edit_presentation'
      patch 'presentations/:presentation_slug', to: 'presentations#update'
      put 'presentations/:presentation_slug', to: 'presentations#update'
      delete 'presentations/:presentation_slug', to: 'presentations#destroy'
      resources :presentations, param: :slug, only: [:new, :index, :create] do
        get :active

        resources :presentation_slides, as: :slides
        resources :presentation_votes, as: :votes
        resources :presentation_leverages, as: :leverages
      end
    end
  end

  # Public facing presenations routes
  namespace :presentations, param: :presentation_slug, as: :active_presentation do
    %i[show settings].each do |r|
      get ":presentation_slug/#{r}", to: "active##{r}", as: r
    end
  end

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
