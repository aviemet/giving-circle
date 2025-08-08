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

  # SETTINGS PAGES #

  namespace :settings do
    get "/", to: redirect("/settings/general")
    [:general, :appearance, :integrations, :localizations, :notifications].freeze.each do |path|
      get path, to: "#{path}#index"
      patch path, to: "#{path}#update"
    end
  end

  draw(:api)

  # Public facing presentations routes
  resources :active_presentations, param: :presentation_slug, shallow: false, only: [:show] do
    get "settings", to: "active_presentations#settings", as: :settings
  end

  # :circle_slug being a param in the first position needs to come after any other first position routing names
  resources :circles, param: :circle_slug, only: [:new, :create, :index]

  # Nested resources under Circle with standard slug param
  scope ":circle_slug" do
    resource :circle, path: "/", param: :circle_slug, as: :circle, shallow: true, except: [:new, :create] do
      get :about

      resources :memberships, param: :slug, concerns: [:bulk_delete]

      resources :orgs, param: :slug do
        get :about
      end

      resources :templates, param: :slug, shallow: false
      namespace :templates do
        get ":template_slug/slides/:slug/edit", to: "slides#edit", as: :edit_slide
      end

      resources :themes, param: :theme_slug, as: :themes
      resources :themes, param: :slug, as: :themes, except: [:show, :edit, :new, :index, :create, :update, :destroy] do
        get :about

        get "orgs", to: "theme_orgs#index"
        post "orgs", to: "theme_orgs#create"
        get "orgs/import", to: "theme_orgs#import"
        resources :theme_orgs, path: :orgs, param: :slug, shallow: false, as: :org, except: [:index, :create]

        # Active presentation backend/admin routes
        resources :active_presentations, param: :presentation_slug, shallow: false

        # Presentation building and editing routes
        resources :presentations, param: :presentation_slug, shallow: false

        namespace :presentations do
          resources :actions,
            path: ":presentation_slug/actions",
            shallow: false,
            as: :actions,
            controller: "/presentations/actions"

          resources :action_responses,
            path: ":presentation_slug/action_responses",
            shallow: false,
            as: :action_responses,
            controller: "/presentations/action_responses"

          resources :presentation_elements,
            path: ":presentation_slug/elements",
            shallow: false,
            as: :elements,
            controller: "/presentations/elements"

          resources :presentation_slides,
            path: ":presentation_slug/slides",
            shallow: false,
            as: :slides,
            controller: "/presentations/slides"
        end
      end
    end
  end

end
