Rails.application.routes.draw do
  root "pages#home" # Public home page for entire project

  # CONCERNS #

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

  resources :circles, param: :circle_slug, only: [:new, :create, :index]

  # Nested resources under Circle with standard slug param
  scope ':circle_slug' do
    resource :circles, path: '/', param: :circle_slug, as: :circle, shallow: true, except: [:new, :create, :index] do
      get :about

      resources :memberships, param: :slug

      resources :orgs, param: :slug do
        get :about
      end

      # resources :presentation_templates, param: :slug

      resources :themes, param: :slug, as: :themes do
        get :about

        get 'orgs', to: 'theme_orgs#index'
        get 'orgs/import', to: 'theme_orgs#import', as: :orgs_import
        resources :theme_orgs, path: :orgs, param: :slug, except: [:index], shallow: false, as: 'org'

        # Admin presentation routes
        resources :presentations, param: :presentation_slug, shallow: false do
          get :active
        end

        namespace :presentations do
          resources :presentation_distributions,
            path: ':presentation_slug/distributions',
            shallow: false,
            as: :distributions,
            controller: '/presentation/distributions'
          resources :presentation_elements,
            path: ':presentation_slug/elements',
            shallow: false,
            as: :elements,
            controller: '/presentation/elements'
          resources :presentation_slides,
            path: ':presentation_slug/slides',
            shallow: false,
            as: :slides,
            controller: '/presentation/slides'
          resources :presentation_votes,
            path: ':presentation_slug/votes',
            shallow: false,
            as: :votes,
            controller: '/presentation/votes'
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
