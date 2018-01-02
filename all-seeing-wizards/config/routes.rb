Rails.application.routes.draw do
  resources :games, only: :create do
    resources :sessions, only: :create
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
