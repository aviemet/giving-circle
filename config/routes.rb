Rails.application.routes.draw do
  root "pages#home" # Public home page for entire project

  mount ActionCable.server => "/ws"

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

  # SETTINGS PAGES #

  namespace :settings do
    get "/", to: redirect("/settings/general")
    [:general, :appearance, :integrations, :localizations, :notifications].freeze.each do |path|
      get path, to: "#{path}#index"
      patch path, to: "#{path}#update"
    end
  end

  draw(:api)

  # Public presentation route (shorter URL)
  get "/:circle_slug/p/:presentation_slug", to: "presentations/active#public_show", as: :circle_public_presentation

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
        post ":template_slug/slides", to: "slides#create", as: :create_slide
      end

      resources :themes, param: :theme_slug, as: :themes
      resources :themes, param: :slug, as: :themes, except: [:show, :edit, :new, :index, :create, :update, :destroy] do
        get :about

        get "orgs", to: "theme_orgs#index"
        post "orgs", to: "theme_orgs#create"
        get "orgs/import", to: "theme_orgs#import"
        resources :theme_orgs, path: :orgs, param: :slug, shallow: false, as: :org, except: [:index, :create]

        # Presentation routes
        resources :presentations, param: :presentation_slug, shallow: false

        # Presentation builder components
        resources :presentation_slides,
          path: "presentations/:presentation_slug/slides",
          param: :slug,
          shallow: false,
          as: :presentation_slides,
          controller: "presentations/slides"

        resources :interactions,
          path: "presentations/:presentation_slug/interactions",
          shallow: false,
          as: :interactions,
          controller: "presentations/interactions"

        resources :interaction_responses,
          path: "presentations/:presentation_slug/interaction_responses",
          shallow: false,
          as: :interaction_responses,
          controller: "presentations/interaction_responses"

        resources :presentation_elements,
          path: "presentations/:presentation_slug/elements",
          shallow: false,
          as: :elements,
          controller: "presentations/elements"

        # Active Presentation
        get "presentations/:presentation_slug/admin", as: :presentation_controls, to: "presentations/active#index"
        get "presentations/:presentation_slug/admin/overview", to: "presentations/active#overview", as: :presentation_overview
        get "presentations/:presentation_slug/admin/members", to: "presentations/active#members", as: :presentation_members
        get "presentations/:presentation_slug/admin/messaging", to: "presentations/active#messaging", as: :presentation_messaging
        get "presentations/:presentation_slug/admin/settings", to: "presentations/active#settings", as: :presentation_settings

        get "presentations/:presentation_slug/activate", to: "presentations#activate", as: :presentation_activate
      end
    end
  end

end
