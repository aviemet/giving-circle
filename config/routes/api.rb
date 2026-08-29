namespace :api do
  resources :users, only: [:create, :update]
  patch "users/:id/update_table_preferences" => "users#update_table_preferences", as: :update_table_preferences
  patch "users/:id/update_user_preferences" => "users#update_user_preferences", as: :update_user_preferences

  get "presentation_elements/templates" => "presentation_elements#templates", as: :presentation_element_templates

  resources :circles, param: :slug, only: [:create, :update] do
    get "mock" => "circles#mock"

    resources :fonts, only: [:index, :create], controller: "circles/fonts"

    resources :spotlights, only: [:index]

    resources :templates, param: :slug, only: [:create, :update, :destroy] do
      resources :slides, param: :slug, controller: "templates/slides", only: [:create, :update, :destroy]
    end

    resources :presentations, param: :slug, only: [:create, :update, :destroy] do
      resources :slides, param: :slug, controller: "presentations/slides", only: [:create, :update, :destroy]
      patch "element_controls" => "presentations/element_controls#update"
      resources :interactions,
        param: :slug,
        controller: "presentations/interactions",
        only: [:update] do
        resources :memberships,
          param: :id,
          controller: "presentations/interaction_memberships",
          only: [:update]
      end
      resources :messages,
        param: :slug,
        controller: "presentations/messages",
        only: [:show] do
        member do
          post :send_message, as: :send
          get :preview_recipients
        end
      end

      member do
        patch :sync_slides
      end
    end

    resources :themes, param: :slug, only: [:create, :update]
  end

  resources :searches, only: [:index]

  resources :currencies, only: [:index]
end
