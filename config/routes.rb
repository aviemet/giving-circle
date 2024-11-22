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

  # Explicitly define routes for Circle to use :circle_slug
  # get 'circles', to: 'circles#index', as: 'circles'
  # get 'circles/new', to: 'circles#index', as: 'new_circles'
  # post 'circles', to: 'circles#create', as: 'circles'

  resources :circles, param: :slug, only: [:new, :create, :index, :destroy]

  # Nested resources under Circle with standard slug param
  scope ':circle_slug' do
    resource :circles, path: '', param: :slug, as: :circle, shallow: true, except: [:new, :create, :index] do
      get :about

      # resources :members, concerns: :bulk_delete, param: :slug

      resources :orgs, param: :slug, except: [:create] do
        get :about
      end

      # resources :presentation_templates, concerns: :bulk_delete, param: :slug

      resources :themes, param: :slug, as: :themes do
        get :about

        # get 'members', to: 'theme_members#index'
        # resources :theme_members, path: :members, param: :slug, as: 'member'

        get 'orgs', to: 'theme_orgs#index'
        get 'orgs/import', to: 'theme_orgs#import', as: :orgs_import
        resources :theme_orgs, path: :orgs, param: :slug, except: [:index], as: 'org'

        # Admin presentation routes
        resources :presentations, param: :slug do
          get :active

          resources :presentation_distributions, as: :distributions, controller: 'presentation/distributions'
          resources :presentation_elements, as: :elements, controller: 'presentation/elements'
          resources :presentation_slides, as: :slides, controller: 'presentation/slides'
          resources :presentation_votes, as: :votes, controller: 'presentation/votes'
        end
      end
    end
  end

  # Public facing presentations routes
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
