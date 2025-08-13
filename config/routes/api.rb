namespace :api do
  resources :users, only: [:create, :update]
  patch "users/:id/update_table_preferences" => "users#update_table_preferences", as: :update_table_preferences
  patch "users/:id/update_user_preferences" => "users#update_user_preferences", as: :update_user_preferences

  resources :circles, param: :circle_slug, as: :circle, shallow: true, only: [:create, :update]

  resources :templates, param: :slug, shallow: true, only: [:create, :update] do
    resources :slides, param: :slug, shallow: false, controller: "templates/slides", only: [:create, :update, :destroy]
  end

  resources :presentations, param: :slug, shallow: true, only: [:create, :update] do
    resources :slides, param: :slug, shallow: false, controller: "presentations/slides", only: [:create, :update, :destroy]
  end

  resources :themes, param: :theme_slug, shallow: true, only: [:create, :update]

  resources :searches, only: [:index]
  resources :spotlights, only: [:index]

  # resources :currencies, only: [:index]

  ## SETTINGS ##
  # post "smtp/test" => "smtps#test", as: :smtp_test
end
