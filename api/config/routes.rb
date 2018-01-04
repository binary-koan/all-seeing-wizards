Rails.application.routes.draw do
  resources :games, only: [:create, :show] do
    resources :sessions, only: :create
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end