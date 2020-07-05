json.extract! article, :id, :title, :author, :created_at, :updated_at
json.url article_url(article, format: :json)
