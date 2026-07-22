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

      member do
        patch :sync_slides
      end
    end

    resources :themes, param: :slug, only: [:create, :update]
  end

  resources :searches, only: [:index]

  # resources :currencies, only: [:index]

  ## SETTINGS ##
  # post "smtp/test" => "smtps#test", as: :smtp_test
end
