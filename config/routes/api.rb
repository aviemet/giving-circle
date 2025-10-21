namespace :api do
  resources :users, only: [:create, :update]
  patch "users/:id/update_table_preferences" => "users#update_table_preferences", as: :update_table_preferences
  patch "users/:id/update_user_preferences" => "users#update_user_preferences", as: :update_user_preferences

  resources :circles, param: :slug, as: :circle, shallow: true, only: [:create, :update] do
    get "mock" => "circles#mock"

    resources :templates, param: :slug, shallow: false, only: [:create] do
      resources :slides, param: :slug, shallow: false, controller: "templates/slides", only: [:create, :update, :destroy]
    end

    patch "templates/:template_slug" => "templates#update", as: :template
    put "templates/:template_slug" => "templates#update"
    delete "templates/:template_slug" => "templates#destroy"

    resources :presentations, param: :slug, shallow: false, only: [:create] do
      resources :slides, param: :slug, shallow: false, controller: "presentations/slides", only: [:create, :update, :destroy]
    end

    patch "presentations/:presentation_slug" => "presentations#update", as: :presentation
    put "presentations/:presentation_slug" => "presentations#update"
    delete "presentations/:presentation_slug" => "presentations#destroy"
    patch "presentations/:presentation_slug/sync_slides" => "presentations#sync_slides", as: :presentation_sync_slides
    put "presentations/:presentation_slug/sync_slides" => "presentations#sync_slides"

    resources :themes, param: :theme_slug, shallow: true, only: [:create, :update]
  end

  resources :searches, only: [:index]
  resources :spotlights, only: [:index]

  # resources :currencies, only: [:index]

  ## SETTINGS ##
  # post "smtp/test" => "smtps#test", as: :smtp_test
end
